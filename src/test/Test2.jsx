import React from 'react';

function Test2() {
  return (
    <div>
<div class="dropdown">
	<input type="checkbox" class="dropdown__switch" id="filter-switch" hidden />
	<label for="filter-switch" class="dropdown__options-filter">
		<ul class="dropdown__filter" role="listbox" tabindex="-1">
			<li class="dropdown__filter-selected" aria-selected="true">
				Default option
			</li>
			<li>
				<ul class="dropdown__select">
					<li class="dropdown__select-option" role="option">
						Option 1
					</li>
					<li class="dropdown__select-option" role="option">
						Option 2
					</li>
					<li class="dropdown__select-option" role="option">
						Option 3
					</li>
					<li class="dropdown__select-option" role="option">
						Option 4
					</li>
					<li class="dropdown__select-option" role="option">
						Option 5
					</li>
				</ul>
			</li>
		</ul>			
	</label>
</div>
    </div>
  );
}

export default Test2;



// $tablet: 768px;

// @mixin breakpoint($point) {
//   @if $point == untilTablet {
//     @media (max-width: $tablet - 1) {
//       @content;
//     }
//   } @else if $point == tablet {
//     @media (min-width: $tablet) {
//       @content;
// 		}
// 	}
// }

// html {
//   box-sizing: border-box;
//   font-size: 62.5%;

//   *,
//   *:before,
//   *:after {
//     box-sizing: inherit;
//   }
// }

// body {
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	width: 100vw;
// 	height: 100vh;
// 	background-color: #98DFFD;
// }

// .dropdown {
// 	width: 100%;
// 	margin: 0 20px;
// 	padding: 20px;
// 	background-color: white;
// 	box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.3);
// 	font-family: 'Lato', sans-serif;
	
// 	@include breakpoint(tablet) {
// 		width: 600px;
// 	}
	
// 	&__switch:checked + &__options-filter &__select {
// 		transform: scaleY(1);
// 	}
	
// 	&__switch:checked + &__options-filter &__filter:after {
// 		transform: rotate(-135deg);
// 	}
	
// 	&__options-filter {
//     width: 100%;
//     cursor: pointer;
//   }

//   &__filter {
//     position: relative;
//     display: flex;
//     padding: 20px;
//     color: #595959;
//     background-color: #fff;
//     border: 1px solid #d6d6d6;
//     border-radius: 30px;
//     font-size: 14px;
//     text-transform: uppercase;
// 		transition: .3s;
		
// 		&:focus {
// 			border: 1px solid #918FF4;
// 			outline: none;
// 			box-shadow: 0 0 5px 3px #918FF4;
// 		}

//     &::after {
//       position: absolute;
//       top: 45%;
//       right: 20px;
//       content: '';
//       width: 10px;
//       height: 10px;
//       border-right: 2px solid #595959;
//       border-bottom: 2px solid #595959;
//       transform: rotate(45deg) translateX(-45%);
//       transition: .2s ease-in-out;
//     }
//   }

//   &__select {
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: 100%;
//     margin-top: 5px;
//     overflow: hidden;
//     box-shadow: 0 5px 10px 0 rgba(152, 152, 152, 0.6);
// 		transform: scaleY(0);
// 		transform-origin: top;
//     font-weight: 300;
//     transition: .2s ease-in-out;
//   }

// 	&__select-option {
//     padding: 20px;
//     background-color: #fff;
// 		border-bottom: 1px solid #d6d6d6;
//     transition: .3s;

//     &:last-of-type {
//   		border-bottom: 0;
//     }

//     &:hover {
//       background-color: #f9f9f9;
//     }
// 	}	
// }




// Change option selected
// const label = document.querySelector('.dropdown__filter-selected')
// const options = Array.from(document.querySelectorAll('.dropdown__select-option'))

// options.forEach((option) => {
// 	option.addEventListener('click', () => {
// 		label.textContent = option.textContent
// 	})
// })

// // Close dropdown onclick outside
// document.addEventListener('click', (e) => {
// 	const toggle = document.querySelector('.dropdown__switch')
// 	const element = e.target

// 	if (element == toggle) return;

// 	const isDropdownChild = element.closest('.dropdown__filter')		
	
// 	if (!isDropdownChild) {
// 		toggle.checked = false
// 	}
// })