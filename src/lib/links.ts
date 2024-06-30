import MaterialSymbolsLightHomeOutline from '~icons/material-symbols-light/home-outline';
import IcBaselineSettings from '~icons/ic/baseline-settings';
import GgPill from '~icons/gg/pill';

// dashboard icons
import IcOutlineSpaceDashboard from '~icons/ic/outline-space-dashboard';
import IcBaselineDashboardCustomize from '~icons/ic/baseline-dashboard-customize';
import MaterialSymbolsAddToPhotosOutlineRounded from '~icons/material-symbols/add-to-photos-outline-rounded';
import IcOutlineChat from '~icons/ic/outline-chat';
import PixelarticonsInfoBox from '~icons/pixelarticons/info-box';

// Dashboard Create icons
// import BxBxsCategoryAlt from '~icons/bx/bxs-category-alt';
import TablerCategory2 from '~icons/tabler/category-2';
import CircumTablets1 from '~icons/circum/tablets-1';
import MaterialSymbolsLightMedicationRounded from '~icons/material-symbols-light/medication-rounded';
import FluentManufacturer24Regular from '~icons/fluent/manufacturer-24-regular';
// NAVLINKS
export const navLinks = [
	{ href: '/', name: 'Home', icon: MaterialSymbolsLightHomeOutline },
	{ href: '/about', name: 'About', icon: PixelarticonsInfoBox },
	{ href: '/drugs', name: 'Drugs', icon: GgPill },
	{ href: '/dashboard', name: 'Dashboard', icon: IcOutlineSpaceDashboard }
];

export const dashboardLinks = [
	{ href: '', name: 'Dashboard', icon: IcOutlineSpaceDashboard },
	{ href: 'create', name: 'Create', icon: IcBaselineDashboardCustomize },
	{ href: 'edit', name: 'Edit', icon: MaterialSymbolsAddToPhotosOutlineRounded },
	{ href: 'messages', name: 'Messages', icon: IcOutlineChat },
	{ href: 'settings', name: 'Settings', icon: IcBaselineSettings }
];

export const dashboardCreateLinks = [
	{ href: 'category', name: 'Category', icon: TablerCategory2 },
	{ href: 'drug', name: 'Drug', icon: MaterialSymbolsLightMedicationRounded },
	{ href: 'drug-item', name: 'Drug-item', icon: CircumTablets1 },
	{ href: 'manufacturer', name: 'Manufacturer', icon: FluentManufacturer24Regular }
];
