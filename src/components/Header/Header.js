const toggle = document.querySelector('.switch-input[type="checkbox"]');

        function setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.body.className = themeName;
        }

        function toggleTheme() {
            if (localStorage.getItem('theme') === "light") {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }
