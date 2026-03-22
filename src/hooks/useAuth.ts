/**
 * useAuth — convenience hook for accessing AuthContext
 * Import this in any component instead of useContext(AuthContext) directly.
 */

import { useAuthContext } from '../context/AuthContext';

export const useAuth = useAuthContext;
export default useAuth;
