import { useRef, useCallback, useEffect } from 'react';

const useAutofocus = (select = true) => {
  const ref = useRef(null);

  const refocus = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
      if (select) {
        setTimeout(() => { ref.current.select(); }, 0);
      }
    }
  }, [select]);

  useEffect(() => {
    refocus();
  }, [refocus]);

  return {
    ref,
    refocus,
  };
};

export default useAutofocus;
