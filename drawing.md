The ordering will be using a method described in one of the answers to this question:
https://www.reddit.com/r/gamedev/comments/18222r/how_to_determine_the_draw_order_for_an_isometric/
To quote the answer:
```
One method is to break everything into single tiles.

If all your oversized tiles are square shaped (e.g 2x2, 4x4) you can draw them in the correct order by drawing screen rows from top to bottom: draw the first row across the top of the screen, then the second row, etc. to the bottom of the screen. Oversized tiles should be drawn during the row that represents their centerpoint. I use this in my game.
```

Every object will consist of at least one square tile. **Non-square objects have to be divided into square section**. The tile drawing order is:
```
drawOrder = transformedWorldX + transformedWorldY
```

- `worldX`, `worldY` - in-world absolute coordinates, before rotation. Non-display-related calculations - path finding, distance calculation etc - use these coordinates. Map is stored in these coordinates, characters path is calculated in these coordinates. These coordinates correspond roughly to geographical direction.
- `transformedWorldX`, `transformedWorldY` - intermediate in calculation in-world coordinates rotated due to selectable viewing direction. These coordinates correspond roughly to screen directions.

Some grid cells can be marked as outermost walls. Outermost walls facing the camera are made invisible, so that they don't obscure view. Inside buildings, avoid very small rooms - they may be not affected by outermost wall auto-hiding.
