export function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: styles,
      }}
    />
  );
}

const styles = JSON.parse('');
