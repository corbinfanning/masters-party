#!/bin/bash
# Sonos helper script

SONOS="/Users/corbin/Library/Python/3.9/bin/sonos"
ROOMS=("Family Room" "Kitchen" "Office")

action="$1"
target="$2"
value="$3"

case "$action" in
  play)
    if [[ "$target" == "all" ]]; then
      for room in "${ROOMS[@]}"; do
        $SONOS "$room" play 2>/dev/null
      done
    else
      $SONOS "$target" play
    fi
    ;;
  pause)
    if [[ "$target" == "all" ]]; then
      for room in "${ROOMS[@]}"; do
        $SONOS "$room" pause 2>/dev/null
      done
    else
      $SONOS "$target" pause
    fi
    ;;
  stop)
    if [[ "$target" == "all" ]]; then
      for room in "${ROOMS[@]}"; do
        $SONOS "$room" stop 2>/dev/null
      done
    else
      $SONOS "$target" stop
    fi
    ;;
  volume)
    $SONOS "$target" volume $value
    ;;
  status)
    if [[ -z "$target" || "$target" == "all" ]]; then
      for room in "${ROOMS[@]}"; do
        echo "=== $room ==="
        $SONOS "$room" status 2>/dev/null
        echo ""
      done
    else
      $SONOS "$target" status
    fi
    ;;
  party)
    $SONOS "${ROOMS[0]}" party_mode
    ;;
  ungroup)
    for room in "${ROOMS[@]}"; do
      $SONOS "$room" ungroup 2>/dev/null
    done
    ;;
  fav|favorite)
    $SONOS "$target" fav "$value"
    ;;
  list)
    $SONOS "${ROOMS[0]}" list_favs
    ;;
  discover)
    /Users/corbin/Library/Python/3.9/bin/sonos-discover
    ;;
  *)
    echo "Usage: sonos.sh <action> [target] [value]"
    echo ""
    echo "Actions:"
    echo "  play [room|all]        - Resume playback"
    echo "  pause [room|all]       - Pause playback"
    echo "  stop [room|all]        - Stop playback"
    echo "  volume <room> <0-100>  - Set volume"
    echo "  status [room|all]      - Show status"
    echo "  party                  - Group all speakers"
    echo "  ungroup                - Ungroup all speakers"
    echo "  fav <room> <name>      - Play favorite"
    echo "  list                   - List favorites"
    echo "  discover               - Rediscover speakers"
    ;;
esac
