/* Types defined inline below */

import { appConfig } from '../config';

const GROUP = appConfig.defaultGroup;
const STATE_ID = appConfig.defaultStateId;
const TAGS = appConfig.defaultTags;

/**
 * In production, Nginx injects `Authorization: Token token=...` server-side.
 * The token is never baked into the JS bundle.
 * In dev (npm run dev), the Vite proxy forwards the header to Zammad.
 * The `import.meta.env.DEV` branch is dead code in production builds
 * and is fully eliminated by Vite's tree-shaking.
 */
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (import.meta.env.DEV) {
    headers['Authorization'] = `Token token=${import.meta.env.VITE_ZAMMAD_TOKEN || ''}`;
  }
  return headers;
}

interface User {
  email: string;
  // Other fields if needed
}

interface MeResponse {
  id: number;
  // Other fields
}

interface TicketResponse {
  id: number;
  // Other fields
}

interface TicketPriority {
  id: number;
  name: string;
  default_create: boolean;
  active: boolean;
}

interface TicketPayload {
  title: string;
  group: string;
  customer_id: string;
  owner_id: number;
  priority_id: number;
  article: {
    content_type: string;
    body: string;
    type: 'note';
    internal: true;
  };
  state_id: number;
  mentions: number[];
  tags: string;
}

export async function getPriorities(): Promise<TicketPriority[]> {
  const response = await fetch('/zammad-api/api/v1/ticket_priorities', { headers: getHeaders() });
  const responseText = await response.text();
  if (!response.ok) {
    console.error('API Error Response (getPriorities):', responseText);
    throw new Error(`Failed to fetch priorities: ${response.status} ${response.statusText} - ${responseText.substring(0, 200)}`);
  }
  try {
    const priorities: TicketPriority[] = JSON.parse(responseText);
    return priorities.filter(p => p.active);
  } catch (parseError) {
    console.error('JSON Parse Error (getPriorities):', responseText.substring(0, 500));
    throw new Error('Invalid JSON response from server');
  }
}

export async function getUsers(): Promise<string[]> {
  const response = await fetch('/zammad-api/api/v1/users', { headers: getHeaders() });
  const responseText = await response.text();
  if (!response.ok) {
    console.error('API Error Response (getUsers):', responseText);
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText} - ${responseText.substring(0, 200)}`);
  }
  try {
    const users: User[] = JSON.parse(responseText);
    const emails = users
      .map(user => user.email)
      .filter(email => email && email.trim() !== '')
      .filter((email, index, self) => self.indexOf(email) === index); // Unique
    return emails;
  } catch (parseError) {
    console.error('JSON Parse Error (getUsers):', responseText.substring(0, 500));
    throw new Error('Invalid JSON response from server');
  }
}

export async function getMe(): Promise<number> {
  const response = await fetch('/zammad-api/api/v1/users/me', { headers: getHeaders() });
  const responseText = await response.text();
  if (!response.ok) {
    console.error('API Error Response (getMe):', responseText);
    throw new Error(`Failed to fetch current user: ${response.status} ${response.statusText} - ${responseText.substring(0, 200)}`);
  }
  try {
    const me: MeResponse = JSON.parse(responseText);
    return me.id;
  } catch (parseError) {
    console.error('JSON Parse Error (getMe):', responseText.substring(0, 500));
    throw new Error('Invalid JSON response from server');
  }
}

export async function createTicket(title: string, customerEmail: string, note: string, priority: number): Promise<TicketResponse> {
  const ownerId = await getMe();
  const customerId = `guess:${customerEmail}`;
  const payload: TicketPayload = {
    title,
    group: GROUP,
    customer_id: customerId,
    owner_id: ownerId,
    priority_id: priority,
    article: {
      content_type: 'text/html',
      body: note,
      type: 'note',
      internal: true,
    },
    state_id: STATE_ID,
    mentions: [ownerId],
    tags: TAGS,
  };

  const response = await fetch('/zammad-api/api/v1/tickets', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  if (!response.ok) {
    console.error('API Error Response (createTicket):', responseText);
    throw new Error(`Failed to create ticket: ${response.status} ${response.statusText} - ${responseText.substring(0, 200)}`);
  }
  try {
    const ticket: TicketResponse = JSON.parse(responseText);
    return ticket;
  } catch (parseError) {
    console.error('JSON Parse Error (createTicket):', responseText.substring(0, 500));
    throw new Error('Invalid JSON response from server');
  }
}
