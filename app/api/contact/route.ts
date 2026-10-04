// ponytail: no rate limiting; add one (e.g. Vercel's firewall rules) if spam gets past the honeypot.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body)
    return Response.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill every field, including the visually hidden one.
  if (body.website) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name) {
    return Response.json({ error: "Please enter a name." }, { status: 400 });
  } else if (name.length > 100) {
    return Response.json(
      { error: "Name should not exceed 100 chars." },
      { status: 400 },
    );
  }

  if (!email) {
    return Response.json({ error: "Please enter an email." }, { status: 400 });
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  if (!message) {
    return Response.json({ error: "Please enter a message." }, { status: 400 });
  } else if (message.length > 5000) {
    return Response.json(
      { error: "Message should not exceed 5000 chars." },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Resend's shared sender: works without a verified domain, but only delivers to the account's own address.
      from: "Portfolio <onboarding@resend.dev>",
      to: "anujkakarot@gmail.com",
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: message,
    }),
  });

  if (!response.ok) {
    console.error("Resend failed:", response.status, await response.text());
    return Response.json(
      { error: "Couldn't send right now. Try email instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
