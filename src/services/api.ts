/**
 * API Service Layer
 * Handles all API calls and data fetching
 */

import { Property, PropertyFilters, Booking } from '../types';
import { MOCK_PROPERTIES } from './mockData';

class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

  /**
   * Fetch properties with optional filters
   */
  async getProperties(filters?: PropertyFilters): Promise<Property[]> {
    try {
      // In development, return mock data
      // In production, make actual API call:
      // const response = await fetch(`${this.baseUrl}/properties`);
      // return response.json();
      return this.filterProperties(MOCK_PROPERTIES, filters);
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  /**
   * Fetch single property by ID
   */
  async getPropertyById(id: string): Promise<Property | null> {
    try {
      return (
        MOCK_PROPERTIES.find((p) => p.id === id) || null
      );
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  }

  /**
   * Create a new booking
   */
  async createBooking(booking: Partial<Booking>): Promise<Booking> {
    try {
      // Mock implementation
      const newBooking: Booking = {
        ...booking,
        id: `booking_${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      } as Booking;
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  /**
   * Filter properties based on criteria
   */
  private filterProperties(properties: Property[], filters?: PropertyFilters): Property[] {
    if (!filters) return properties;

    return properties.filter((property) => {
      if (filters.city && property.location.city !== filters.city) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.beds && property.specs.beds !== filters.beds) return false;
      if (filters.status && property.status !== filters.status) return false;
      if (filters.premium && !property.premium) return false;
      return true;
    });
  }
}

export const apiService = new ApiService();
