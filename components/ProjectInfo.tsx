import React from 'react';
import Skeleton from './ui/Skeleton';
import type { Project, TeamMember } from '@prisma/client';

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="w-fit bg-black px-2 py-1 uppercase text-white">{children}</span>;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span>{label}</span>
      <Chip>{value}</Chip>
    </div>
  );
}

type Props = {
  project: Project & {
    teamMembers: Record<string, { count: number; members: TeamMember[] }>;
  };
};

export default async function ProjectInfo({ project }: Props) {
  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-2">
        <span className="font-bold">About the project</span>
        <Info label="Project name:" value={project.name} />
        <Info label="Company:" value={project.companyName} />
        <Info
          label="Duration:"
          value={`${project.startDate.getFullYear()}-${project.expectedLaunchDate.getFullYear()}`}
        />
        <Info label="Expected launch:" value={project.expectedLaunchDate.toLocaleDateString()} />
      </div>
      <div className="hidden flex-col gap-2 sm:flex">
        <span className="font-bold">Team members</span>
        {Object.entries(project.teamMembers).map(([role, member]) => {
          return <Chip key={role}>{`${role.split('-').join(' ')} (${member.count})`}</Chip>;
        })}
      </div>
      <div className="hidden flex-col gap-2 md:flex">
        <span className="font-bold">Deliverables</span>
        {project.deliverables.split(';').map(deliverable => {
          return (
            <span key={deliverable} className="w-fit bg-black px-2 py-1 text-white">
              {deliverable}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectInfoSkeleton() {
  return <Skeleton className="mb-[84px] w-1/2" />;
}
