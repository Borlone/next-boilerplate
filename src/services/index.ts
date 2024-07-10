import { api } from '@/shared/utils/api';

export function getPokemon() {
   return api.get('');
}