FROM alpine:latest

RUN apk add --no-cache bash nano vim procps

# 課題用のディレクトリを作成
RUN mkdir -p /etc/railway /var/log/railway

# Task 1用: 改ざんされた信号設定ファイル
RUN echo "SIGNAL_NORTH=RED_LOCKED" > /etc/railway/signal.conf && \
    echo "SIGNAL_SOUTH=RED_LOCKED" >> /etc/railway/signal.conf && \
    echo "OVERRIDE_BY=attacker_x" >> /etc/railway/signal.conf

# Task 2用: 不正アクセスログ
RUN echo "2026-11-24 02:14:01 INFO Normal operation" > /var/log/railway/access.log && \
    echo "2026-11-24 03:45:12 WARN Failed login attempt from 10.24.99.203" >> /var/log/railway/access.log && \
    echo "2026-11-24 03:45:19 ALERT Unauthorized root access from 10.24.99.203" >> /var/log/railway/access.log

# Task 3用: 復旧コマンドとフラグ生成スクリプト
RUN echo '#!/bin/bash' > /usr/local/bin/restart-signal && \
    echo 'if grep -q "SIGNAL_NORTH=GREEN" /etc/railway/signal.conf && grep -q "SIGNAL_SOUTH=GREEN" /etc/railway/signal.conf; then' >> /usr/local/bin/restart-signal && \
    echo '  echo "[OK] Signal system restored! Trains are moving."' >> /usr/local/bin/restart-signal && \
    echo '  echo "FLAG{R41LW4Y_S1GN4L_R3ST0R3D_2026}"' >> /usr/local/bin/restart-signal && \
    echo 'else' >> /usr/local/bin/restart-signal && \
    echo '  echo "[ERROR] Signal config is still locked or invalid. Check /etc/railway/signal.conf"' >> /usr/local/bin/restart-signal && \
    echo 'fi' >> /usr/local/bin/restart-signal && \
    chmod +x /usr/local/bin/restart-signal

WORKDIR /root
CMD ["/bin/bash"]