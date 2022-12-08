import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	assetsInclude: ['**/*.jpg', '**/*.glsl', '**/*.obj', '**/*.ply', '**/*.off']
};

export default config;
