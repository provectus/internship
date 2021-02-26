


DETAILS=$(ip a | grep eth0)
HOST_MASK=$(echo $DETAILS | cut -d ' ' -f 13)
HOST=$(echo $HOST_MASK | cut -d '/' -f 1)
exec /usr/bin/supervisord
