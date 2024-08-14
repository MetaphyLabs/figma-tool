import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <section>
        <div>
          <p>Hello World</p>
          <Link href='/app'>App</Link>
        </div>
      </section>
    </main>
  );
}
