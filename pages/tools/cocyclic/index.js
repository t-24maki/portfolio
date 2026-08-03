// pages/tools/cocyclic/index.js
import SEO from '../../../components/Common/SEO';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

const BOARD_SIZE = 9;
const PREFERRED_CELL_SIZE = 40;
const MIN_CELL_SIZE = 30;

function areCollinear(p1, p2, p3) {
  const area = (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2;
  return Math.abs(area) < 0.0001;
}

function arePointsCollinear(points) {
  const coords = points.map((index) => ({
    x: index % BOARD_SIZE,
    y: Math.floor(index / BOARD_SIZE),
  }));
  const firstCheck = areCollinear(coords[0], coords[1], coords[2]);
  if (!firstCheck) return false;
  return areCollinear(coords[1], coords[2], coords[3]);
}

function findCircleFromPoints(points, cellSize, boardPadding) {
  const coords = points.map((index) => ({
    x: (index % BOARD_SIZE) * cellSize + cellSize / 2 + boardPadding,
    y: Math.floor(index / BOARD_SIZE) * cellSize + cellSize / 2 + boardPadding,
  }));

  const p1 = coords[0], p2 = coords[1], p3 = coords[2], p4 = coords[3];
  const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
  const perp1 = { x: -(p2.y - p1.y), y: p2.x - p1.x };
  const perp2 = { x: -(p3.y - p2.y), y: p3.x - p2.x };
  const denominator = perp1.x * perp2.y - perp1.y * perp2.x;

  if (Math.abs(denominator) < 0.0001) return null;

  const t = ((mid2.x - mid1.x) * perp2.y - (mid2.y - mid1.y) * perp2.x) / denominator;
  const center = { x: mid1.x + perp1.x * t, y: mid1.y + perp1.y * t };
  const radius = Math.sqrt(Math.pow(center.x - p1.x, 2) + Math.pow(center.y - p1.y, 2));
  const distance4 = Math.sqrt(Math.pow(center.x - p4.x, 2) + Math.pow(center.y - p4.y, 2));

  if (Math.abs(distance4 - radius) > 0.1) return null;
  return { center, radius };
}

function findLineFromPoints(points, cellSize, boardPadding) {
  const coords = points.map((index) => ({
    x: (index % BOARD_SIZE) * cellSize + cellSize / 2 + boardPadding,
    y: Math.floor(index / BOARD_SIZE) * cellSize + cellSize / 2 + boardPadding,
  }));

  const p1 = coords[0];
  const p2 = coords[coords.length - 1];
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const boardSize = BOARD_SIZE * cellSize + boardPadding * 2;

  let startPoint, endPoint;
  if (Math.abs(dx) > Math.abs(dy)) {
    const slope = dy / dx;
    startPoint = { x: 0, y: p1.y - slope * p1.x };
    endPoint = { x: boardSize, y: startPoint.y + slope * boardSize };
  } else {
    const slope = dx / dy;
    startPoint = { x: p1.x - slope * p1.y, y: 0 };
    endPoint = { x: startPoint.x + slope * boardSize, y: boardSize };
  }
  return { startPoint, endPoint };
}

function checkCocyclicPoints(board, cellSize, boardPadding) {
  const stones = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i]) stones.push(i);
  }

  const shapes = [];
  if (stones.length < 4) return { shapes, gameOver: false };

  for (let i = 0; i < stones.length - 3; i++) {
    for (let j = i + 1; j < stones.length - 2; j++) {
      for (let k = j + 1; k < stones.length - 1; k++) {
        for (let l = k + 1; l < stones.length; l++) {
          const points = [stones[i], stones[j], stones[k], stones[l]];

          if (arePointsCollinear(points)) {
            shapes.push({
              type: 'line',
              points,
              line: findLineFromPoints(points, cellSize, boardPadding),
            });
          }

          const circleInfo = findCircleFromPoints(points, cellSize, boardPadding);
          if (circleInfo) {
            shapes.push({
              type: 'circle',
              points,
              center: circleInfo.center,
              radius: circleInfo.radius,
            });
          }
        }
      }
    }
  }

  return { shapes, gameOver: shapes.length > 0 };
}

export default function CocyclicGame() {
  const [board, setBoard] = useState(() => new Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [stoneCount, setStoneCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [cellSize, setCellSize] = useState(PREFERRED_CELL_SIZE);
  const containerRef = useRef(null);

  const boardPadding = 32;
  const totalBoardSize = BOARD_SIZE * cellSize + boardPadding * 2;

  const updateCellSize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 128;
      const calculated = Math.floor(containerWidth / BOARD_SIZE);
      setCellSize(Math.max(Math.min(calculated, PREFERRED_CELL_SIZE), MIN_CELL_SIZE));
    }
  }, []);

  useEffect(() => {
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [updateCellSize]);

  const handleClick = useCallback((index) => {
    if (board[index] || gameOver) return;

    setHistory((prev) => [...prev, { board: [...board], stoneCount, gameOver, shapes: [...shapes] }]);

    const newBoard = [...board];
    newBoard[index] = 'black';
    const newStoneCount = stoneCount + 1;

    const result = checkCocyclicPoints(newBoard, cellSize, boardPadding);

    setBoard(newBoard);
    setStoneCount(newStoneCount);
    setShapes(result.shapes);
    setGameOver(result.gameOver);
  }, [board, stoneCount, gameOver, shapes, cellSize]);

  const undoMove = useCallback(() => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setBoard([...lastState.board]);
    setStoneCount(lastState.stoneCount);
    setGameOver(lastState.gameOver);
    setShapes([...lastState.shapes]);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  const resetGame = useCallback(() => {
    setBoard(new Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setStoneCount(0);
    setGameOver(false);
    setShapes([]);
    setHistory([]);
  }, []);

  // Highlighted stone indices
  const highlightedPoints = {};
  shapes.forEach((shape) => {
    shape.points.forEach((p) => { highlightedPoints[p] = true; });
  });

  const stoneSize = Math.floor(cellSize * 0.875);

  return (
    <>
      <SEO
        title="「共円」で遊んでみよう"
        description="碁盤上に石を置いて、4つの石が同一円周上に並ばないようにするパズルゲーム「共円」がWeb上で遊べます。"
        path="/tools/cocyclic/"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tnishimaki.com/" }, { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tnishimaki.com/tools/" }, { "@type": "ListItem", "position": 3, "name": "共円 (Cocyclic)" }] }) }} />
      </SEO>

      <div>
        <header className="page-header">
          <div className="page-eyebrow">
            <Link href="/tools/" style={{ color: 'inherit', textDecoration: 'none' }}>Tools</Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
            <span>Cocyclic</span>
          </div>
          <h1 className="page-title">「共円」で遊んでみよう</h1>
          <p className="page-description">
            碁盤に石を1つずつ置いてゆき、任意の4つの石が同一円周上に配置されてしまったら終わりというゲームです。一直線上に4つ置かれた場合も「半径無限の円周上の4点」とみなされNGになります。
          </p>
          <p className="page-description" style={{ marginTop: '0.75rem' }}>
            思わぬ4点が円周上になってしまうこともあり、単純ながら非常に奥深い理系パズルです。あなたは円を作らずいくつの石を置けるでしょうか？
          </p>
        </header>

        <main className="content-section">
          <div className="cocyclic-wrapper" ref={containerRef}>
            <div className="cocyclic-main">
            {/* Board */}
            <div className="cocyclic-board" style={{ padding: boardPadding, position: 'relative', display: 'inline-block' }}>
              <div
                className="cocyclic-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${BOARD_SIZE}, ${cellSize}px)`,
                  gap: 0,
                }}
              >
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => {
                  const row = Math.floor(i / BOARD_SIZE);
                  const col = i % BOARD_SIZE;
                  const isFirstRow = row === 0;
                  const isLastRow = row === BOARD_SIZE - 1;
                  const isFirstCol = col === 0;
                  const isLastCol = col === BOARD_SIZE - 1;

                  return (
                    <div
                      key={i}
                      className="cocyclic-cell"
                      style={{ width: cellSize, height: cellSize, position: 'relative' }}
                    >
                      {/* Horizontal line */}
                      <div
                        className="cocyclic-line-h"
                        style={{
                          left: isFirstCol ? '50%' : 0,
                          right: isLastCol ? '50%' : 0,
                        }}
                      />
                      {/* Vertical line */}
                      <div
                        className="cocyclic-line-v"
                        style={{
                          top: isFirstRow ? '50%' : 0,
                          bottom: isLastRow ? '50%' : 0,
                        }}
                      />
                      {/* Intersection button */}
                      <button
                        className="cocyclic-intersection"
                        style={{ width: stoneSize, height: stoneSize }}
                        onClick={() => handleClick(i)}
                        disabled={gameOver && !board[i]}
                      >
                        {board[i] && (
                          <div
                            className={`cocyclic-stone${highlightedPoints[i] ? ' highlighted' : ''}`}
                            style={{ width: stoneSize - 4, height: stoneSize - 4 }}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* SVG overlay for circles/lines */}
              <svg
                className="cocyclic-svg"
                width={totalBoardSize}
                height={totalBoardSize}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                }}
              >
                {shapes.map((shape, idx) =>
                  shape.type === 'circle' ? (
                    <circle
                      key={idx}
                      cx={shape.center.x}
                      cy={shape.center.y}
                      r={shape.radius}
                      fill="none"
                      stroke="blue"
                      strokeWidth="4"
                      opacity="0.6"
                    />
                  ) : (
                    <line
                      key={idx}
                      x1={shape.line.startPoint.x}
                      y1={shape.line.startPoint.y}
                      x2={shape.line.endPoint.x}
                      y2={shape.line.endPoint.y}
                      stroke="blue"
                      strokeWidth="4"
                      opacity="0.6"
                    />
                  )
                )}
              </svg>
            </div>

            {/* Controls (right side) */}
            <div className="cocyclic-controls">
              <span className="cocyclic-stone-count">置いた石の数: {stoneCount}</span>
              <button onClick={undoMove} disabled={history.length === 0} className="cocyclic-btn cocyclic-btn-secondary">
                一手戻す
              </button>
              <button onClick={resetGame} className="cocyclic-btn cocyclic-btn-primary">
                リセット
              </button>
              {gameOver && (
                <div className="cocyclic-message">
                  共円！（赤枠の4つの石が同一円周上または一直線上にあります）
                </div>
              )}
            </div>
            </div>

            {/* Note */}
            <p className="cocyclic-note">
              共円ができた場合、自動判定されます。数人で交互に石を置いていき「共円を作ってしまったら負け」という対戦ゲームとしても利用できます。
            </p>
          </div>

          {/* Description Section */}
          <div className="calc-description">
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">共円の基本的な考え方</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  まず、4点で長方形が作れる場合は無条件で共円となります。4点で等脚台形が作れる場合も同様に共円です。
                </p>
                <p>
                  当然と思われるかもしれませんが、図形がナナメになっていたり、石が増えてきたりすると意外と気が付かないものです。まずはこの「長方形・等脚台形を作らない」ことに注意し、石を配置していきましょう。
                </p>
                <p>
                  ちなみに長方形、等脚台形でなくても共円となってしまう組み合わせは無数に存在します。色々と考えてみましょう。
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <img src="/images/kyoen1.png" alt="共円の基本的な考え方" style={{ maxWidth: '50%', height: 'auto', borderRadius: '8px' }} />
                </div>
              </div>
            </div>

            <div className="category">
              <div className="category-header">
                <h2 className="category-title">作者の記録</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  共円を作らずにいくつ石を置けるか検証したところ、17個まで置けました。もしこれ以上石を置けたら教えてください。
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <img src="/images/kyoen2.png" alt="作者の記録" style={{ maxWidth: '50%', height: 'auto', borderRadius: '8px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div style={{ marginTop: '3rem' }}>
            <Link href="/tools/" className="entry-link">
              <svg viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ツール一覧に戻る
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
