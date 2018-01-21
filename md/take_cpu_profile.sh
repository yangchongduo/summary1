#!/bin/bash

NODE_KILL=`which node-kill`

if [ -f "$HOME/.nodepath" ]; then
  echo $HOME;
  echo '>>>>>'
  
  NODE_KILL=`cat $HOME/.nodepath`/node-kill;
fi
echo NODE_KILL
$NODE_KILL --start_profiling $1