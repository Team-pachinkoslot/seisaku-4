const WebSocket = require('ws');
const { spawn } = require('child_process');

const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocketサーバー起動中 (Port: 8080)...');

wss.on('connection', (ws) => {
  const containerName = `ctf-player-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  console.log(`[接続] コンテナ起動: ${containerName}`);

  // プレイヤー専用の使い捨てDockerコンテナを起動
  const docker = spawn('docker', [
    'run', '--rm', '-i',
    '--name', containerName,
    '--memory', '128m',
    '--cpus', '0.5',
    'railway-ctf-linux',
    '/bin/bash', '-i'
  ]);

  // コンテナからの出力をブラウザへ送信
  docker.stdout.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(data.toString());
  });
  docker.stderr.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(data.toString());
  });

  // ブラウザで打ったコマンドをコンテナへ送信
  ws.on('message', (message) => {
    docker.stdin.write(message.toString());
  });

  // ブラウザを閉じたらコンテナを自動削除
  ws.on('close', () => {
    console.log(`[切断] コンテナ破棄: ${containerName}`);
    spawn('docker', ['rm', '-f', containerName]);
  });
});