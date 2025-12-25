// AI Worker for parallel minimax search (alpha-beta)
// This worker receives a serialized board and computes the best move for the given aiColor.

function cloneBoard(b) {
  return b.map(row => row.slice());
}

function isValidMove(board, row, col, player, W, H) {
  if (board[row][col] !== 0) return false;
  const opponent = -player;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for (const [dx,dy] of dirs) {
    let r = row + dx, c = col + dy;
    let hasOpp = false;
    while (r>=0 && r<H && c>=0 && c<W) {
      if (board[r][c] === 0) break;
      if (board[r][c] === opponent) { hasOpp = true; }
      else if (board[r][c] === player && hasOpp) { return true; }
      else break;
      r += dx; c += dy;
    }
  }
  return false;
}

function getValidMoves(board, player, W, H) {
  const moves = [];
  for (let i=0;i<H;i++) for (let j=0;j<W;j++) if (isValidMove(board,i,j,player,W,H)) moves.push([i,j]);
  return moves;
}

function applyMove(board, row, col, player, W, H) {
  board[row][col] = player;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for (const [dx,dy] of dirs) {
    let r = row+dx, c = col+dy;
    const toFlip = [];
    while (r>=0 && r<H && c>=0 && c<W) {
      if (board[r][c] === 0) break;
      if (board[r][c] === -player) { toFlip.push([r,c]); }
      else if (board[r][c] === player && toFlip.length>0) {
        for (const [fr,fc] of toFlip) board[fr][fc] = player;
        break;
      } else break;
      r += dx; c += dy;
    }
  }
}

function evaluate(board, W, H, BLACK, WHITE, diff) {
  const mult = 0.2 + (diff-1)*0.1;
  const weights = Array.from({length:H},()=>Array(W).fill(0));
  for (let i=0;i<H;i++) for (let j=0;j<W;j++) {
    const isCorner = (i===0||i===H-1)&&(j===0||j===W-1);
    const nearCorner = (i<=1||i>=H-2)&&(j<=1||j>=W-2);
    const isEdge = (i===0||i===H-1||j===0||j===W-1);
    let base=5;
    if (isCorner) base=120; else if (nearCorner) base=-20; else if (isEdge) base=20; else base=5;
    weights[i][j] = Math.round(base*mult);
  }
  let score=0;
  for (let i=0;i<H;i++) for (let j=0;j<W;j++) {
    if (board[i][j]===BLACK) score += weights[i][j];
    else if (board[i][j]===WHITE) score -= weights[i][j];
  }
  return score;
}

function minimax(board, depth, isMax, alpha, beta, W, H, BLACK, WHITE, diff, cached) {
  if (depth===0) return evaluate(board,W,H,BLACK,WHITE,diff);
  const player = isMax ? BLACK : WHITE;
  const moves = getValidMoves(board, player, W, H);
  if (moves.length===0) {
    const oppMoves = getValidMoves(board, -player, W, H);
    if (oppMoves.length===0) return evaluate(board,W,H,BLACK,WHITE,diff);
    return minimax(board, depth-1, !isMax, alpha, beta, W, H, BLACK, WHITE, diff, cached);
  }
  if (isMax) {
    let maxV = -Infinity;
    for (const [r,c] of moves) {
      const newBoard = cloneBoard(board);
      applyMove(newBoard, r, c, player, W, H);
      const v = minimax(newBoard, depth-1, false, alpha, beta, W, H, BLACK, WHITE, diff, cached);
      maxV = Math.max(maxV, v);
      alpha = Math.max(alpha, v);
      if (beta<=alpha) break;
    }
    return maxV;
  } else {
    let minV = Infinity;
    for (const [r,c] of moves) {
      const newBoard = cloneBoard(board);
      applyMove(newBoard, r, c, player, W, H);
      const v = minimax(newBoard, depth-1, true, alpha, beta, W, H, BLACK, WHITE, diff, cached);
      minV = Math.min(minV, v);
      beta = Math.min(beta, v);
      if (beta<=alpha) break;
    }
    return minV;
  }
}

function getAIResult(board, W, H, BLACK, WHITE, diff, aiColor) {
  const moves = getValidMoves(board, aiColor, W, H);
  if (moves.length===0) return null;
  let best = moves[0];
  let bestScore = -Infinity;
  const depth = diff<=6?2:(diff<=15?3:8);
  for (const [r,c] of moves) {
    const b2 = cloneBoard(board);
    applyMove(b2, r, c, aiColor, W, H);
    const score = minimax(b2, depth-1, false, -Infinity, Infinity, W, H, BLACK, WHITE, diff, {});
    if (score>bestScore) { bestScore=score; best=[r,c]; }
  }
  return best;
}

self.onmessage = function(e){
  const data = e.data;
  if (!data || data.type!=='compute') return;
  const board = data.board;
  const W = data.BOARD_WIDTH, H = data.BOARD_HEIGHT;
  const BLACK = data.BLACK, WHITE = data.WHITE;
  const diff = data.difficulty;
  const aiColor = data.aiColor;

  const best = getAIResult(board, W, H, BLACK, WHITE, diff, aiColor);
  self.postMessage({type:'move', move: best, aiColor});
};
