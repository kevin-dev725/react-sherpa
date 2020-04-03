export const profilesToAgents = profiles => {
  return profiles.map(profile => ({
    phone: profile.phone || '',
    ...profile.user,
    id: profile.id
  }));
};
