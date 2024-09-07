import Images from '@/common/images';
import Button from '@/ui/Button';
import Flex from '@/ui/Flex';
import Input from '@/ui/Input';
import PageTitle from '@/ui/PageTitle';
import SectionWrapper from '@/ui/SectionWrapper';
import { useTranslation } from 'react-i18next';

const Invoices = () => {
    const { t } = useTranslation();
    return (
        <>
            <SectionWrapper>
                <PageTitle title="Invoices" />
            </SectionWrapper>
            <SectionWrapper>
                <Flex justify="space-between" align="center" wrap="nowrap" gap={16}>
                    <Input
                        placeholder={t(`search`)}
                        variant={'secondary'}
                        type="text"
                        width={300}
                        height="small"
                        icon={<img src={Images.search} />}
                    />
                    <Flex align="flex-end" justify="space-between" gap={16}>
                        <Button
                            onClick={() => { }}
                            variant="tertiary"
                            size={'small'}
                            icon={<img src={Images.print} />}
                        >
                            {t('PrintInvoices')}
                        </Button>
                        <Button
                            onClick={() => { }}
                            variant="tertiary"
                            size={'small'}
                            icon={<img src={Images.install} />}
                        >
                            {t('DownloadInvoices')}
                        </Button>
                    </Flex>
                </Flex>
            </SectionWrapper>

        </>
    );
};
export default Invoices;
