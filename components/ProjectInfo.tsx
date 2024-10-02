import React from 'react';
import { getProjectWithTeamMembers } from '@/data/project';

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="w-fit bg-black px-2 py-1 uppercase text-white">{children}</span>;
}

export default async function ProjectInfo() {
  const projectAndMembers = await getProjectWithTeamMembers();

  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-2">
        <span className="font-bold">About the project</span>
        <div className="flex flex-col gap-2 sm:flex-row">
          <span>Project name: </span>
          <Chip>{projectAndMembers.name}</Chip>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <span>Company: </span>
          <Chip>{projectAndMembers.companyName}</Chip>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <span>Expected launch:</span>
          <Chip>{projectAndMembers.expectedLaunch.toLocaleDateString()}</Chip>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Team members</span>
        {Object.entries(projectAndMembers.teamMembers).map(([role, member]) => {
          return <Chip key={role}>{`${role.split('-').join(' ')} (${member.count})`}</Chip>;
        })}
      </div>
    </div>
  );
}
