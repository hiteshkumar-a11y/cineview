interface ThemeToggleProps {
    currentTheme: "light" | "dark";
    onChange: (theme: "light" | "dark") => void;
  }
  
  function ThemeToggle({
    currentTheme,
    onChange,
  }: ThemeToggleProps) {
    return (
      <button
        type="button"
        onClick={() =>
          onChange(
            currentTheme === "light"
              ? "dark"
              : "light"
          )
        }
      >
        {currentTheme === "light"
          ? "Switch to Dark"
          : "Switch to Light"}
      </button>
    );
  }
  
  export default ThemeToggle;