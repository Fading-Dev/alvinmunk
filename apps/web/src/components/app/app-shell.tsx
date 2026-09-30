'use client';

import { useWallet } from '@/components/wallet/wallet-provider';
import { IdentityBar } from '@/components/IdentityBar';
import { StatUstrip } from '@/components/app/stat-strip';
import { BadgeGallery } from '@/components/BadgeGallery';
import { AppTabs } from '@/components/app/app-tabs';
import { VouchClaimedNotice } from '@/components/VouchClaimedNotice';

/**
 * App shell — the persistent chrome around every signed-in /app/* route: identity, the
 * reputation stat strip, and the sticky sub-nav. It stays mounted as the content area
 * swaps between Home / Vouch / Quests / Rewards / Activity, so the dashboard feels like
 * one product, not five stacked pages.
 *
 * On phones the shell collapses into one compact row (identity + stats) plus a
 * one-line badge summary, so the first action on /app stays above the fold.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { profile } = useWallet();
  if (!profile) return null;

  return (
    <div className="container max-w-4xl py-4 sm:py-6">
      <div className="flex items-center gap-3 sm:block">
        <div className="min-w-0 flex-1">
          <IdentityBar />
        </div>
        <div className="hidden sm:block sm:mt-4">
          <StatStrip address={profile.address} />
        </div>
        <div class="flex shrink-0 sm:hidden">
          <StatStrip address={profile.address} compact />
        </div>
      </div>
      {/* Milestone badges — collapsed to a one-line summary on phones, full grid on desktop */}
      <div className="mt-3 sm:mt-4">
        <BadgeGallery address={profile.address} />
      </div>
      <div class="mt-4 sm:mt-5">
        <AppTabs />
      </div>
      {/* Loop-closing notice: toasts when a vouch you minted gets claimed (in-app only) */}
      <VouchClaimedNotice />
      <div className="pt-4 sm:pt-6">{children}</div>
    </div>
  );
}
