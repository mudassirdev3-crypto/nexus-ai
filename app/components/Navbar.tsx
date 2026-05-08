import Link from 'next/link';
<Link href="/dashboard/leads">
  <div className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white hover:text-black transition-all">
     <UsersIcon className="w-5 h-5" />
     <span className="font-bold">Leads</span>
  </div>
</Link>