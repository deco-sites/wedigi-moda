import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: LiveImage;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText(
  { tag, label, description, alignment }: {
    tag?: string;
    label?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-white uppercase">{tag}</div>}
      {label && <h3 class="text-lg text-white uppercase">{label}</h3>}
      {description && (
        <div class="text-sm text-white uppercase">{description}</div>
      )}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="flex flex-col gap-8 lg:gap-10 text-base-content"
    >
      <Slider class="carousel">
        {list.map((
          { tag, label, description, href, image, buttonText },
          index,
        ) => (
          <Slider.Item
            index={index}
            class={`flex flex-col relative carousel-item`}
          >
            <a
              href={href}
              class="flex flex-col lg:w-[280px] w-40 lg:h-auto"
            >
              {layout.categoryCard?.textPosition === "top" &&
                (
                  <div class="absolute bottom-8 left-8" style={{ zIndex: 2 }}>
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  </div>
                )}
              {image &&
                (
                  <figure>
                    <Image
                      class="card w-full rounded-none"
                      src={image}
                      alt={description || label || tag}
                      width={160}
                      height={195}
                      loading="lazy"
                    />
                  </figure>
                )}
              {layout.categoryCard?.textPosition === "bottom" &&
                (
                  <CardText
                    tag={tag}
                    label={label}
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}
            </a>
            {buttonText &&
              <a href={href} class="btn">{buttonText}</a>}
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
