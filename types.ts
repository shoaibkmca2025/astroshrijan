
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: string;
}

export interface ConsultationType {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  initials: string;
}

export type ModalType = 'booking' | 'payment' | null;

export interface BookingDetails {
  serviceId: string;
  serviceName: string;
  price: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  timeOfBirth: string;
  placeOfBirth: string;
  questions: string;
}
