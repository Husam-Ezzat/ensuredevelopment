import React from 'react';
import ErrorSection from '@/ui/ErrorSection';
import Images from '@/common/images';

const Page404: React.FC = () => {
  return (
    <>

      <div className="container">
        <ErrorSection
          image={Images.notFound}
          title="Page Not Found!"
          subtitle="The page you are looking for was moved,removed,renamed or might never have existed."
        />
      </div>

    </>
  );
};

export default Page404;
