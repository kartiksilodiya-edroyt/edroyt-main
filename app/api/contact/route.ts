// // app/api/contact/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';
// import { z } from 'zod';

// // ── Resend client (server-side only) ───────────────────────────────────────
// const resend = new Resend(process.env.RESEND_API_KEY);

// // ── Zod schema ─────────────────────────────────────────────────────────────
// const contactSchema = z.object({
//   firstName: z.string().min(1, 'First name is required').max(50),
//   lastName:  z.string().min(1, 'Last name is required').max(50),
//   email:     z.string().email('Please enter a valid email address'),
//   company:   z.string().max(100).optional(),
//   service:   z.string().max(100).optional(),
//   budget:    z.string().max(100).optional(),
//   details:   z.string().min(10, 'Please describe your project (min 10 characters)').max(5000),
//   honeypot:  z.string().max(0, 'Bot detected'), // must be empty
// });

// // ── POST handler ───────────────────────────────────────────────────────────
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     // Validate with Zod
//     const parsed = contactSchema.safeParse(body);
//     if (!parsed.success) {
//       const firstError = parsed.error.errors[0]?.message ?? 'Invalid input';
//       return NextResponse.json({ error: firstError }, { status: 400 });
//     }

//     const { firstName, lastName, email, company, service, budget, details } = parsed.data;

//     // Send email via Resend
//     const { error } = await resend.emails.send({
//       from:     process.env.RESEND_FROM_EMAIL!,
//       to:       [process.env.CONTACT_RECEIVER_EMAIL!],
//       replyTo:  email,
//       subject:  `New brief from ${firstName} ${lastName}${company ? ` · ${company}` : ''}`,
//       html: `
//         <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:12px;">
//           <h2 style="color:#16a34a;margin:0 0 24px;">New Contact Brief</h2>

//           <table style="width:100%;border-collapse:collapse;">
//             <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:120px;">Name</td>
//                 <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${firstName} ${lastName}</td></tr>
//             <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Email</td>
//                 <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#16a34a;">${email}</a></td></tr>
//             ${company ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Company</td>
//                 <td style="padding:8px 0;color:#0f172a;font-size:14px;">${company}</td></tr>` : ''}
//             ${service ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Service</td>
//                 <td style="padding:8px 0;color:#0f172a;font-size:14px;">${service}</td></tr>` : ''}
//             ${budget ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Budget</td>
//                 <td style="padding:8px 0;color:#0f172a;font-size:14px;">${budget}</td></tr>` : ''}
//           </table>

//           <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">

//           <h3 style="color:#0f172a;margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;">Project Details</h3>
//           <p style="color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;background:#fff;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">${details}</p>

//           <p style="color:#94a3b8;font-size:12px;margin-top:32px;">Sent from edroyt.com contact form</p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error('[Resend error]', error);
//       return NextResponse.json(
//         { error: 'Failed to send email. Please try again.' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true }, { status: 200 });

//   } catch (err) {
//     console.error('[Contact route error]', err);
//     return NextResponse.json(
//       { error: 'An unexpected error occurred.' },
//       { status: 500 }
//     );
//   }
// }