#!/usr/bin/env bash

{ # Boilerplate
  set -e

  # Ensure we have associative arrays, coprocesses, mapfile and more
  if test "${BASH_VERSINFO[0]}" -lt 4; then exit 1; fi

  # Needed by the `usage` command
  readonly __functions_before="$(declare -F | cut -d' ' -f3)"

  readonly HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &>/dev/null 2>&1 && pwd )"

  usage() {
    echo Available commands:
    echo
    comm -13 <(echo "$__functions_before") <(echo "$__functions_after") | sed '/^__/d;s/^/    - /'
  }

  here() {
    ( cd "$HERE" && "$@" )
  }
}

start-dev(){
    npm run start:watch
}

start(){
    npm start
}

{ # Boilerplate
  # Needed by the `usage` command
  readonly __functions_after="$(declare -F | cut -d' ' -f3)"

  "${@:-usage}"
}