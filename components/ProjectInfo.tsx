import React from 'react';
import { getProject } from '@/data/project';

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="bg-black px-2 py-1 uppercase text-white">{children}</span>;
}

export default async function ProjectInfo() {
  const project = await getProject();

  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-2">
        <span className="font-bold">About the project</span>
        <div className="flex gap-2">
          <span>Project name: </span>
          <Chip>{project.name}</Chip>
        </div>
        <div className="flex gap-2">
          <span>Company: </span>
          <Chip>{project.name}</Chip>
        </div>
        <div className="flex gap-2">
          <span>Expected launch:</span>
          <Chip>{project.expectedLaunch.toLocaleDateString()}</Chip>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Team members</span>
        {Object.entries(project.teamMembers).map(([role, member]) => {
          return <Chip key={role}>{`${role.split('-').join(' ')} (${member.count})`}</Chip>;
        })}
      </div>
    </div>
  );
}
