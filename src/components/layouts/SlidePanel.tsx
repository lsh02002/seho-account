import { useRef } from "react";
import { useModalManager } from "../../context/ModalContext";
import { layout } from "../../theme/theme";

type SlidePanelProps = {
  title: string;
  children: React.ReactNode;
  zIndex?: number;
  name: string;
  position?: "top" | "bottom";
};

const SlidePanel = ({
  title,
  children,
  zIndex = 50,
  name,
  position = "bottom",
}: SlidePanelProps) => {
  const { closeModal, isOpen } = useModalManager();

  const isOpenPanel = isOpen(name);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const isTop = position === "top";

  const closePanel = () => {
    const activeElement = document.activeElement;

    if (
      activeElement instanceof HTMLElement &&
      sidebarRef.current?.contains(activeElement)
    ) {
      activeElement.blur();
    }

    closeModal(name);
  };

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          zIndex: zIndex - 1,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          opacity: isOpenPanel ? 1 : 0,
          pointerEvents: isOpenPanel ? "auto" : "none",
          transition: "opacity 220ms ease",
        }}
        onClick={closePanel}
        aria-hidden="true"
      />

      <aside
        ref={sidebarRef}
        className="position-fixed bg-white d-flex flex-column start-0 w-100"
        style={{
          zIndex,
          height: "70%",
          borderRadius: isTop ? "0 0 20px 20px" : "20px 20px 0 0",
          top: isTop ? 0 : "auto",
          bottom: 0,
          transform: isOpenPanel
            ? "translateY(0)"
            : isTop
              ? "translateY(-100%)"
              : "translateY(100%)",
          transition: "transform 220ms ease",
        }}
        aria-hidden={!isOpenPanel}
      >
        <div
          className="d-flex align-items-center justify-content-between border-bottom px-3 w-100 flex-shrink-0"
          
        >
          <h2 className="m-0 fs-6 fw-bold">{title}</h2>

          <button
            type="button"
            className="btn border-0 bg-transparent fs-3 text-secondary px-1 py-0"
            onClick={closePanel}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div
          className="flex-grow-1 overflow-y-auto d-flex justify-content-center"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <nav
            role="navigation"
            style={{
              flex: 1,
              width: "100%",
              maxWidth: layout.maxWidth,
              marginBottom: 80,
            }}
          >
            <div style={{ paddingBottom: 200 }}>{children}</div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SlidePanel;
