import { supabase } from './supabase';

export interface Shelter {
    id: string;
    name: string;
    address: string;
    distance: string;
    logo: string;
}

export interface Pet {
    id: string;
    name: string;
    breed: string;
    age: string;
    gender: string;
    location: string;
    distance: string;
    fee: string | null;
    image: string;
    type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
    tags: string[];
    description: string;
    shelter_id: string | null;
    shelter?: Shelter;
    video_url: string | null;
    vaccination: string | null;
    neutered: boolean;
    special_needs: string | null;
    created_at: string;
}

export interface AdoptionApplication {
    pet_id: string;
    housing_type: string;
    ownership: string;
    reason: string;
    has_pets: boolean;
}

/**
 * Fetch all pets, optionally filtered by type
 */
export async function getPets(type?: string): Promise<Pet[]> {
    let query = supabase
        .from('pets')
        .select('*, shelter:shelters(*)');

    if (type && type !== 'all') {
        query = query.eq('type', type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        // Suppress "table not found" error since we fallback to local mock data
        if (error.code !== 'PGRST205') {
            console.error('Error fetching pets:', error);
        }
        return [];
    }

    return (data ?? []).map((row: any) => ({
        ...row,
        shelter: row.shelter ?? { name: '', address: '', distance: '', logo: '' },
    }));
}

/**
 * Fetch a single pet by ID
 */
export async function getPetById(id: string): Promise<Pet | null> {
    const { data, error } = await supabase
        .from('pets')
        .select('*, shelter:shelters(*)')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code !== 'PGRST205') {
            console.error('Error fetching pet:', error);
        }
        return null;
    }

    return {
        ...data,
        shelter: data.shelter ?? { name: '', address: '', distance: '', logo: '' },
    } as Pet;
}

/**
 * Submit an adoption application
 */
export async function submitAdoption(application: AdoptionApplication): Promise<{ success: boolean; error: string | null }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: '请先登录' };
    }

    const { error } = await supabase
        .from('adoption_applications')
        .insert({
            user_id: user.id,
            pet_id: application.pet_id,
            housing_type: application.housing_type,
            ownership: application.ownership,
            reason: application.reason,
            has_pets: application.has_pets,
            status: 'pending',
        });

    if (error) {
        console.error('Error submitting adoption:', error);
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}
