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