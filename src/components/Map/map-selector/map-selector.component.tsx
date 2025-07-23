// import { Tooltip } from '@chakra-ui/react';
//TODO JS revisar el tooltip
import {  useRef, useState } from 'react';
import type {CSSProperties, ReactElement,} from 'react';	
import { TileLayer } from 'react-leaflet';

export const MapSelector = () => {
	interface objMapStyles {
		url: string;
		img: string;
	}
	const maps: objMapStyles[] = [
		{
			url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
			img: '/select-map/satelital.png'
		},
		{
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			img: '/select-map/colorfull_natural.png'
		}
	];

	const [tileMap, setTileMap] = useState(0);
	const [openTiles, showTiles] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const changeTile = (n: number) => {
		setTileMap(n);
		showTiles(false);
	};

	return (
		<>
			{tileMap === 0 && <TileLayer url={maps[tileMap].url} maxZoom={25} maxNativeZoom={25} subdomains={['mt1', 'mt2', 'mt3']} />}
			{tileMap === 1 && <TileLayer url={maps[tileMap].url} maxZoom={25} maxNativeZoom={25} />}
			{/* <Tooltip hasArrow label='Estilos de Mapas' placement='right'> */}
			<div className="select-map" ref={containerRef}>
				<MapBaseTileItem
					style={{
						backgroundImage: `url(${maps[tileMap].img})`
					}}
					className="select-map--styles__indicator"
					onClick={() => showTiles(!openTiles)}
					n={-1}
					flag={<div>Mapas</div>}
				/>
				{openTiles && maps.map((m, i) => <MapBaseTileItem n={i} onClick={() => changeTile(i)} key={i} className="select-map--styles" />)}
			</div>
			{/* </Tooltip> */}
		</>
	);
};

const MapBaseTileItem = ({
	onClick,
	n,
	className,
	style,
	flag,
	title
}: {
	onClick: (mapNumber: number) => void;
	n: number;
	className?: string;
	style?: CSSProperties;
	flag?: ReactElement;
	title?: string;
}) => {
	return (
		<div onClick={() => onClick(n)} className={`box-border ${className}`} style={style} title={title}>
			{flag}
		</div>
	);
};
