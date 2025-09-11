import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; // Import nodemailer

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, address, contact, notes, selectedProducts } = body;

    console.log('Received bulk order request:');
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Contact:', contact);
    console.log('Notes:', notes);
    console.log('Selected Products:', selectedProducts);

    // Implement email sending logic here.
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to the business owner (athensdubeyofficial@gmail.com)
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'athensdubeyofficial@gmail.com', // The recipient of the bulk order request
      subject: 'New Bulk Order Quote Request',
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Contact:</strong> ${contact || 'N/A'}</p>
        <p><strong>Notes:</strong> ${notes || 'N/A'}</p>
        <h3>Products:</h3>
        <ul>
          ${selectedProducts.map((p: any) => `<li>${p.title}: ${p.quantity}</li>`).join('')}
        </ul>
      `,
    };

    await transporter.sendMail(ownerMailOptions);

    // Email to the client (confirmation)
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Send to the client's email address
      subject: 'Your Bulk Order Request Confirmation - HUME Fragrance',
      html: `
        <p>Dear Customer,</p>
        <p>Thank you for your bulk order request with HUME Fragrance. We have received your request and will get back to you shortly with a quote.</p>
        <p>Here are the details of your request:</p>
        <h3>Products:</h3>
        <ul>
          ${selectedProducts.map((p: any) => `<li>${p.title}: ${p.quantity}</li>`).join('')}
        </ul>
        <p>We will contact you at ${email} or ${contact || 'the provided address'} to discuss your quote.</p>
        <p>Best regards,</p>
        <p>The HUME Fragrance Team</p>
      `,
    };

    await transporter.sendMail(clientMailOptions);

    return NextResponse.json({ message: 'Bulk order request received successfully! A confirmation email has been sent to you.' }, { status: 200 });
  } catch (error) {
    console.error('Error processing bulk order request:', error);
    return NextResponse.json({ message: 'Error processing request.' }, { status: 500 });
  }
}
