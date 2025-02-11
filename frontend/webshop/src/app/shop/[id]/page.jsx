"use client";

import Link from "next/link";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
	ShoppingCartIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/solid";

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(id);
		async function fetchProduct() {
			try {
				const response = await fetch(
					`https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products/${id}`
				);
				const data = await response.json();
				console.log(product);
				setProduct(data);
			} catch (error) {
				console.error("Error fetching product:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchProduct();
	}, [id]);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center p-6">
				<div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
				<div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
				<div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-4"></div>
				<div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
			</div>
		);
	}


	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
				{/* <div className="relative w-full md:w-1/2 h-96">
					<Image
						src={product.pictureUrl}
						alt={product.name}
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
					/>
				</div> */}

				<div className="p-6 flex flex-col justify-between w-full md:w-1/2">
					<div>
						<h1 className="text-2xl font-semibold text-gray-800">
							{product.name}
						</h1>
						<p className="text-gray-500 text-sm mt-1">{product.category}</p>
						<p className="text-lg font-bold text-gray-900 mt-4">
							{product.currency} {product.price}
						</p>
						<p className="text-gray-600 mt-2">{product.description}</p>

						<div className="mt-4">
							<h3 className="text-sm font-semibold text-gray-700">
								Available Colors:
							</h3>
							<div className="flex gap-2 mt-2">
								{product.colors.map((color, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm bg-gray-200 rounded"
									>
										{color}
									</span>
								))}
							</div>
						</div>

						<div className="mt-4">
							<h3 className="text-sm font-semibold text-gray-700">
								Materials:
							</h3>
							<div className="flex gap-2 mt-2">
								{product.materials.map((material, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm bg-gray-200 rounded"
									>
										{material}
									</span>
								))}
							</div>
						</div>

						<div className="mt-4 flex items-center">
							{product.stock > 0 ? (
								<CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
							) : (
								<XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
							)}
							<span className="text-gray-700">
								{product.stock > 0
									? `${product.stock} in stock`
									: "Out of stock"}
							</span>
						</div>
					</div>

					<button
						className={`mt-6 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded shadow-md 
							transition-all ${
								product.stock > 0
									? "hover:bg-blue-700"
									: "opacity-50 cursor-not-allowed"
							}`}
							onClick={() => { window.location.href = `/shop/${id}`}}						
							  disabled={product.stock === 0}
					>
						<ShoppingCartIcon className="h-5 w-5 mr-2" />
						{product.stock > 0 ? "Add to Cart" : "Sold Out"}
					</button>
				</div>
			</div>
		</div>
	);
}
