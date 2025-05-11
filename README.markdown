# eSewa Payment Integration in Next.js

This repository contains a complete implementation of eSewa payment gateway integration in a Next.js (React.js) application. The project includes a frontend payment form, backend APIs for payment initiation and verification, and success/failure pages. Built with TypeScript, Tailwind CSS, and Next.js App Router, this solution is ideal for accepting payments in Nepal-based applications, such as donations or e-commerce platforms.

## Features
- **Payment Form**: A responsive modal form for collecting user details (name, email, amount).
- **Backend APIs**: Secure APIs to initiate payments, verify transactions, and handle success/failure cases.
- **Success/Failure Pages**: User-friendly feedback pages with Tailwind CSS and Lucide icons.
- **Security**: Input validation, HMAC-SHA256 signature generation, and environment variable usage.
- **Sandbox** Testing**: Supports eSewa sandbox for safe testing.

## Prerequisites
Before setting up the project, ensure you have:
- **Node.js** (v16 or higher) and **npm** or **yarn**.
- A **Next.js** project (version 13 or later with App Router).
- An **eSewa merchant account** with a Merchant ID and Secret Key.
- Basic knowledge of **React**, **Next.js**, and **TypeScript**.
- **Git** installed for cloning the repository.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/esewa-nextjs-payment.git
   cd esewa-nextjs-payment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs required packages: `uuid`, `crypto-js`, and `@types/uuid` for TypeScript support.

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   ESEWA_MERCHANT_ID=your_merchant_id
   ESEWA_SECRET_KEY=your_secret_key
   AUTH_URL=http://localhost:3000
   ```
   - Replace `your_merchant_id` and `your_secret_key` with credentials from eSewa.
   - Update `AUTH_URL` to your production URL when deploying.

## Project Structure
Key files and directories:
- `components/EsewaPayment.tsx`: Frontend payment form component.
- `app/api/payment/initiate/route.ts`: API to initiate payment.
- `app/api/payment/success/route.ts`: API to verify and handle successful payments.
- `app/api/payment/failure/route.ts`: API to handle failed payments.
- `app/success/page.tsx`: Success page UI.
- `app/failure/page.tsx`: Failure page UI.
- `public/images/esewa_logo.png`: eSewa logo for the payment button.

## Usage
1. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

2. **Test the Payment Flow**:
   - Click the "Pay Via eSewa" button to open the payment form.
   - Enter your name, email, and amount (in NPR).
   - Submit the form to initiate payment via eSewa’s sandbox.
   - Complete the payment in the eSewa interface.
   - Verify redirection to the success or failure page.

3. **Sandbox Testing**:
   - Use eSewa’s sandbox environment by updating the payment URL in `app/api/payment/initiate/route.ts` to:
     ```ts
     paymentUrl: 'https://dev.esewa.com.np/epay/main'
     ```
   - Obtain sandbox credentials from eSewa’s developer portal.

## Code Overview
### Frontend (`EsewaPayment.tsx`)
- **Purpose**: Collects user input and initiates payment.
- **Key Features**:
  - Uses `useState` for form state management.
  - Submits data to `/api/payment/initiate`.
  - Dynamically creates a hidden form for eSewa redirection.
  - Styled with Tailwind CSS, includes a modal and error handling.

### Backend APIs
- **Initiate Payment (`app/api/payment/initiate/route.ts`)**:
  - Validates inputs and calculates 13% VAT.
  - Generates a unique transaction ID with `uuid`.
  - Creates an HMAC-SHA256 signature using `crypto-js`.
  - Returns eSewa payment URL and parameters.
- **Success Handler (`app/api/payment/success/route.ts`)**:
  - Verifies transactions with eSewa’s API.
  - Validates signatures for security.
  - Redirects to the success page.
- **Failure Handler (`app/api/payment/failure/route.ts`)**:
  - Redirects to the failure page for unsuccessful transactions.

### Pages
- **Success Page (`app/success/page.tsx`)**: Displays a confirmation message with a green checkmark (Lucide icon).
- **Failure Page (`app/failure/page.tsx`)**: Shows an error message with a red X (Lucide icon).

## Deployment
1. **Prepare for Production**:
   - Update `.env` with your production `AUTH_URL` (e.g., `https://yourdomain.com`).
   - Change the payment URL in `app/api/payment/initiate/route.ts` to:
     ```ts
     paymentUrl: 'https://epay.esewa.com.np/api/epay/main/v2/form'
     ```

2. **Deploy**:
   - **Vercel**:
     ```bash
     vercel
     ```
     Follow the prompts to deploy.
   - **Netlify** or other platforms: Push to a Git repository and link to your hosting provider.
   - Ensure environment variables are set in the hosting platform’s dashboard.

3. **Test in Production**:
   - Verify the payment flow with real eSewa credentials.
   - Check success and failure redirects.
   - Monitor for errors in your hosting platform’s logs.

## Best Practices
- **Security**:
  - Store sensitive data (e.g., `ESEWA_SECRET_KEY`) in environment variables.
  - Use HTTPS in production.
  - Validate all inputs to prevent injection attacks.
- **Error Handling**:
  - Display user-friendly error messages.
  - Log errors securely for debugging.
- **User Experience**:
  - Ensure the form is mobile-responsive.
  - Provide clear feedback during payment processing.
- **Testing**:
  - Test edge cases (e.g., invalid amounts, network issues).
  - Use eSewa’s sandbox to avoid real transactions during development.

## Troubleshooting
- **Payment Initiation Fails**: Check `ESEWA_MERCHANT_ID` and `ESEWA_SECRET_KEY` in `.env.local`.
- **Redirect Issues**: Verify `AUTH_URL` matches your domain.
- **Signature Errors**: Ensure the signature message format matches eSewa’s requirements.
- **CORS Errors**: Test in a proper development environment, not a file-based browser preview.

## Resources
- [eSewa Developer Documentation](https://developer.esewa.com.np/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Blog Post Tutorial](#) *(Link to your blog post)*
- [YouTube Tutorial](#) *(Link to your YouTube video)*

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out via:
- GitHub Issues: [Open an issue](https://github.com/your-username/esewa-nextjs-payment/issues)
- Email: your-email@example.com
- YouTube: [Your Channel Name](#)
- Website: [Your Website](#)

Happy coding, and thank you for using this eSewa payment integration project!