import { Button } from "@/components/ui/button";
import { Figma, Chrome } from "lucide-react";
import { SiJirasoftware } from "react-icons/si";

const integrations = [
  {
    name: 'Figma',
    description: '',
    icon: <Figma />,
    url: 'https://www.figma.com/',
    status: 'inactive',
  },
  {
    name: 'Google Chrome',
    description: '',
    icon: <Chrome />,
    url: 'https://google.com/',
    status: 'inactive',
  },
  {
    name: 'Jira',
    description: '',
    icon: <SiJirasoftware />,
    url: 'https://www.jira.com/',
    status: 'inactive',
  },

];

export function Integrations() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-3xl font-bold'>Integrations</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className='flex flex-col items-center justify-center rounded-xl border border-neutral-300 bg-background p-4 shadow-md transition-all hover:border-neutral-500 hover:shadow-lg'
          >
            <a href={integration.url} target='_blank' rel='noreferrer'>
              {integration.icon}
            </a>
            <h2 className='mt-4 text-center text-lg font-medium text-foreground'>{integration.name}</h2>
            <p className='mt-2 text-center text-sm text-muted-foreground'>{integration.description}</p>
            <Button variant='outline' size='sm' className='mt-4 text-center' disabled={integration.status === 'inactive'}>
              Connect
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}