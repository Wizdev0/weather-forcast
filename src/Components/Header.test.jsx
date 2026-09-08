import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    it('renders the Units button', () => {
        render(<Header units={{ temperature: 'celsius', windSpeed: 'kmh', precipitation: 'mm' }} onUnitChange={() => {}} />);

        expect(screen.getByText('Units')).toBeInTheDocument();
    });
});