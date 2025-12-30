const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-bg-elevated rounded ${className}`} />
);

const ProfileSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6 ">
      {/* Header */}
      <Skeleton className="h-24 w-full" />

      {/* Account Card */}
      <Skeleton className="h-64 w-full" />

      {/* Security */}
      <Skeleton className="h-32 w-full" />

      {/* Referral */}
      <Skeleton className="h-32 w-full" />
    </div>
  );
};

export default ProfileSkeleton;
