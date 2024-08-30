'use client';

import { Fragment } from 'react';
import { tools } from './tools.constants';

interface ToolsProps {
  tab: string;
}

export function Tools({ tab }: ToolsProps) {
  return (
    <Fragment>
      {tools[tab as keyof typeof tools]?.map((Tool, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Tool key={index} />
      ))}
    </Fragment>
  );
}

// export function Tools({ tab }: ToolsProps) {
//   return (
//     <Fragment>
//       <AnimatePresence mode='wait'>
//         {tools[tab as keyof typeof tools]?.map((Tool, index) => (
//           // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
//           <AnimatePresence key={index} mode='wait'>
//             <motion.div
//               // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
//               key={index}
//               className='overflow-hidden bg-red-200'
//               initial={{ opacity: 0, width: '0px' }}
//               animate={{ opacity: 1, width: 'auto' }}
//               exit={{ opacity: 0, width: '0px', transition: { duration: 0.3 } }}
//             >
//               <Tool />
//             </motion.div>
//           </AnimatePresence>
//         ))}
//       </AnimatePresence>
//     </Fragment>
//   );
// }
