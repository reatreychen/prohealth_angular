declare module 'aos' {
  interface AosOptions {
    duration?: number;
    once?: boolean;
    offset?: number;
    delay?: number;
    easing?: string;
    disable?: boolean | string | (() => boolean);
    startEvent?: string;
    animatedClassName?: string;
    initClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
    mirror?: boolean;
  }

  interface Aos {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const aos: Aos;
  export default aos;
}

