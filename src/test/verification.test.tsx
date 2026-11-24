import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { createRouter, createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { validateSurgeon } from '@/lib/council';

afterEach(() => { cleanup(); vi.useRealTimers(); });
describe('Surgeon verification safeguards', () => {
  it('requires a surgeon name and permits no registration number', () => {
    expect(validateSurgeon('   ')).toBe('Please enter the surgeon’s full name.');
    expect(validateSurgeon('Dr Test Surgeon')).toBeNull();
  });
  it('never reports a registration result after submitting a name', async () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ['/professions'] }), context: { queryClient: new QueryClient() } });
    await router.load();
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('link', { name: 'CVSZ home' })).toHaveClass('header-crest-contained');
    expect(screen.getByRole('link', { name: 'Chat with the Council on WhatsApp' })).toHaveAttribute('href', 'https://wa.me/263772347291');
    fireEvent.click(screen.getByRole('button', { name: 'Login / Register' }));
    expect(screen.getByRole('link', { name: 'Access Vet Account' })).toHaveAttribute('href', '/vet-account');
    expect(screen.getByRole('link', { name: /Register As A Legal Vet.*Registration Fee/ })).toHaveAttribute('href', '/vet-registration');
    const trigger = screen.getAllByRole('button', { name: 'Verify a Surgeon' }).at(0);
    if (!trigger) throw new Error('Verification action is missing');
    fireEvent.click(trigger);
    expect(screen.getByRole('img', { name: 'CVSZ crest' })).toHaveAttribute('width', '48');
    fireEvent.change(screen.getByLabelText(/Surgeon’s Full Name/), { target: { value: 'Dr Test Surgeon' } });
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole('button', { name: 'Verify Surgeon' }));
    expect(screen.getByRole('status').textContent).toBe('Verifying Vet, Please wait...');
    await act(async () => { vi.advanceTimersByTime(2400); });
    expect(screen.getByRole('status').textContent).toBe('Live verification is not yet available. Please contact the Council for official confirmation.');
  });
});

describe('Payments cart', () => {
  it('adds a service, shows the subtotal, and removes it from the cart', async () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ['/'] }), context: { queryClient: new QueryClient() } });
    await router.load();
    render(<RouterProvider router={router} />);

    expect(document.querySelector('.mobile-cart-float')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Secondary navigation' }).querySelector('a[href="/complaints"]')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Main navigation' })?.querySelector('a[href="/complaints"]')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Payments' }));
    expect(screen.getAllByRole('button', { name: 'Pay this' })).toHaveLength(6);
    for (const service of ['Registration fee', 'Certificate of registration', 'Annual fee', 'Surgery licencing fee', 'Hospital Licensing fees', 'Letter of Good Standing']) {
      expect(screen.getByRole('heading', { name: service })).toBeInTheDocument();
    }
    for (const amount of ['$125', '$25', '$150', '$250', '$300', '$75']) {
      expect(screen.getByText(amount)).toBeInTheDocument();
    }
    fireEvent.click(screen.getAllByRole('button', { name: 'Pay this' })[0]!);
    expect(screen.getByRole('heading', { name: 'Your cart' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    const mobileCartButton = document.querySelector('.mobile-cart-float button');
    expect(mobileCartButton).toHaveAccessibleName('Open cart, 1 item');
    fireEvent.click(mobileCartButton!);

    expect(screen.getByRole('heading', { name: 'Your cart' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Registration fee' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Your cart' }).querySelector('.cart-summary strong')).toHaveTextContent('$125');
    const paynowMethod = screen.getByRole('radio', { name: 'Paynow' });
    const bankAccountMethod = screen.getByRole('radio', { name: 'Bank Account' });
    expect(paynowMethod).toBeChecked();
    fireEvent.click(bankAccountMethod);
    expect(bankAccountMethod).toBeChecked();
    expect(paynowMethod).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled();
    expect(screen.queryByText(/Payments are not available yet/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove Registration fee from cart' }));
    expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
  });
});

describe('Council articles', () => {
  it('shows the three articles and links to official updates without sample labels', async () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ['/news'] }), context: { queryClient: new QueryClient() } });
    await router.load();
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('link', { name: 'View official Council news' })).toHaveAttribute('href', 'https://cvsz.org/index.php/news/');
    expect(screen.queryByText(/sample article|sample educational content/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Why registration with the Council matters' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Keeping veterinary practice current in a changing world' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One Health: a shared responsibility' })).toBeInTheDocument();
  });
});