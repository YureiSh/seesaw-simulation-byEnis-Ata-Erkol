# seesaw-simulation-byEnis-Ata-Erkol 
Seesaw simulation i did with Torque and rotation measurements, with pure HTML-CSS-JS This project is an interactive seesaw simulation using pure HTML-CSS-JS. Users can place weighted objects on a board, observe torque changes, store state using

```localStorage```

, and reset the system. 

🧠 Thought Process & Design Decisions 🧠 
Starting with HTML structure I began by designing the layout directly in HTML. My initial assumption was that canvas would be the right tool for drawing the seesaw, board, pivot, and weight positions. 

After 1–2 hours of experimenting with lineTo, moveTo, and manual redraw logic, I found that canvas quickly became tedious and limiting—especially when trying to rotate a straight line dynamically. Switching fully to CSS transforms This became the key design decision. Using:

```transform: rotate(...);```

,opened up a much cleaner approach. Instead of redrawing lines, I simply rotated DOM elements. 
In the end, I’m really glad I went with CSS through JS instead of using htmlcanvas. I never fully figured out how to rotate a simple line properly with canvas, and honestly, it felt more frustrating than productive. Once I switched to CSS transforms, everything clicked—ideas started flowing almost instantly. 

I also have to give a small shout-out to W3Schools for the quick references along the way. I tried hard not to rely on AI tools for the core implementation; maybe I double-checked a syntax or two, but nothing beyond that. 🙏