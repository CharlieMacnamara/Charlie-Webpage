<div className="flex justify-between items-start">
  <div>
    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
      {company}
    </div>
    {title && (
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {title}
      </div>
    )}
  </div>
  <div className="text-sm text-zinc-500 dark:text-zinc-400">
    {start} — {end}
  </div>
</div> 