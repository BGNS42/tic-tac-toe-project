# 🎮 Tic-Tac-Toe Project  
**Built for The Odin Project – JavaScript / Node Path**

<!-- Badges -->  
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow?style=for-the-badge&logo=javascript)  
<!-- ![The Odin Project](https://img.shields.io/badge/Powered%20by-The%20Odin%20Project-blue?style=for-the-badge&logo=theodinproject)   -->
![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge) 

---

## 🚀 Project Overview  
This is a classic **Tic-Tac-Toe** (noughts and crosses) game, built as part of the **The Odin Project** curriculum (JavaScript / Node path).

**The goal:** create a fully functional, interactive 2-player game with turn logic, win / draw detection, and a round-based scoring system.

---

## ✨ Features  
### 🕹️ Gameplay
- Two players (X and O), alternating turns.  
- Prevent choosing the same cell twice (validation).  
- Real-time update of board on the UI.  
- Win detection: all rows, columns, diagonals.  
- Draw detection when board is full.
### 🏆 Score System  
- Each win increases the player’s score.
- The match ends automatically when a player reaches 3 wins.
- Current round number is tracked and displayed.
- Board resets at the end of each round. 
### ♻️ Smart Reset Behavior
- Round Reset: clears the board, moves to the next round, and resets only current-turn choices.
- Match Reset: triggers when a player reaches 3 points (best of 5).
- Score resets when a match restarts.
### 🧱 Clean Architecture with Factory Functions
- `createPlayer()` → manages player choices and score
- `createJogo()` → contains rules, scoring, turns, and win verification
- `model()` → handles all UI/DOM updates
### 🎨 Simple & Functional Interface
- Organized layout using CSS
- Clear user experience
- Immediate visual feedback on every move  

---

## 🛠️ Technologies Used

**HTML5:** Building the basic structure of the board.

**CSS3:** Game styling and responsive layout.

**JavaScript (ES6+):**

- Game logic (win detection, turn changes)

- State management (players, round, scores)

- DOM manipulation (updating cells, resetting)

---

## 💡 What I Learned & Reinforced

Modular coding with factory functions.

State management: tracking cell choices, turns, rounds, and score.

Dynamic DOM updates & event handling.

Game logic: detecting wins (via combo arrays), preventing invalid moves.

Architecture for future expansion (e.g. AI opponent, more UI features).

---

## 🖼️ Screenshots / GIFs  

![alt text](assets/gif/gameGif.gif)

---

## 🚧 Main Challenges & Solutions
- **🧩 1. Preventing Players from Clicking the Same Cell Twice**

    - **Challenge:** Repeated moves were breaking the game logic.
    - **Solution:** Validation using `escolhidos.includes(cell)` with early return.

- **🔄 2. Separating Round Reset from Match Reset**

    - **Challenge:** Mixed reset logic caused inconsistent game states.
    - **Solution:**

        - `resetRound()` → clears choices and resets the board

        - `resetMatch()` → resets scores and restarts the entire match

- **🧠 3. Elegant Win Detection**

    - **Challenge:** Checking all winning combinations without redundant code.
    - **Solution:**

        - Using a winCombos array + some() + every():
            ```
            winCombos.some(combo => combo.every(cell => escolhas.includes(cell)));
            ```

            Simple, readable, and efficient.

- **🏗️ 4. Keeping the Code Clean and Modular**

    - **Challenge:** Avoid mixing DOM logic with game logic.
    - **Solution:**

        - `createJogo()` → game rules & state

        - `model()` → UI layer

        - Clear, isolated communication between modules

---

## ⚙️ How to Run / Play Locally
Try it [LIVE](https://bgns42.github.io/tic-tac-toe-project/) or

```
git clone https://github.com/BGNS42/tic-tac-toe-project.git

cd tic-tac-toe-project  
```

Open `index.html` in your browser, and you’re ready to play.

---

<!-- ## 🧪 Future Improvements / Roadmap --- IDEAS

Add AI (single player) mode.

Add undo move feature.

Improve UI: animations, hover effects.

Add score history (which round each player won).

Add sound effects.

--- -->

## 🧑‍💻 Author

Made by [BGNS42](https://github.com/BGNS42)

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/igor-carrasco/) or explore my other projects on GitHub!

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
