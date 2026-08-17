import { ExhibitCard } from '../ExhibitCard';

// Thin wrapper — reuses the exact ExhibitCard from TeamSection
export function AlumniCard({ alum, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <ExhibitCard
        title={alum.name}
        description={alum.currentRole}
        color="bg-[#1099B7]"
        image={alum.photo}
        rotation={0}
        github={alum.github || '#'}
        linkedin={alum.linkedin || '#'}
      />
    </div>
  );
}
