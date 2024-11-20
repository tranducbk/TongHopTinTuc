const Posts = require('../models/Posts')
const mongoose = require('../../utill/mongoose')
const { render } = require('express/lib/response')
const { JSDOM } = require('jsdom');

class PostController {


    // [POST] /post/create
    // create(req, res, next) {
    //     const formData = req.body
    //     formData.spotling = true
    //     const post = new Posts(formData)
    //     post.save()
    //         .then(() => res.redirect('/admin/assets'))
    //         .catch(next) 
    // }

    // Test auto điền tên vào trường name của bài báo
    
    // // [POST] /post/create
    create(req, res, next) {
        const formData = req.body;
        const courseApi = formData.link;

        async function start() {
            const courses = await getCourses(); // Lấy dữ liệu từ RSS
    if (courses.length === 0) {
        console.log("No data to save.");
        return res.redirect('/admin/assets'); // Chuyển hướng ngay nếu không có dữ liệu
    }

    try {
        for (const course of courses) {
            const post = new Posts({
                name: course.name,
                author: course.author,
                topic: course.topic,
                description: course.description,
                image: course.image,
                link: course.link,
                spotling: course.spotling,
                category: course.category,
                publicationDate: course.publicationDate
            });

            await post.save();
            console.log(`Saved post: ${course.name}`);
        }

        // Khi lưu xong, chuyển hướng
        res.redirect('/admin/assets');
    } catch (error) {
        console.error('Failed to save courses:', error);
        res.status(500).send('Internal Server Error');
    }
        }

        start(); // Gọi hàm start()

        // Lấy dữ liệu từ API
        async function getCourses() {
            try {
                const response = await fetch(courseApi);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
        
                const xmlString = await response.text();
                const dom = new JSDOM(xmlString, { contentType: 'application/xml' });
                const document = dom.window.document;
        
                const items = document.querySelectorAll('item');
                return Array.from(items).map(item => {
                    const descriptionHTML = item.querySelector('description')?.textContent || '';
                    
                    // Phân tích nội dung HTML của description
                    const descriptionDOM = new JSDOM(descriptionHTML);
                    const plainText = descriptionDOM.window.document.body.textContent.trim(); // Lấy nội dung văn bản thuần

                    const pubDate = item.querySelector('pubDate')?.textContent || ''; // Lấy ngày phát hành

                    // Chuyển đổi pubDate sang định dạng DD MMM YYYY
                    const dateObj = new Date(pubDate);
                    const formattedDate = new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    }).format(dateObj); // Lấy định dạng ngày theo DD MMM YYYY
                    
                    return {
                        name: item.querySelector('title')?.textContent.trim(),
                        description: plainText, // Chỉ lấy phần văn bản
                        image: descriptionDOM.window.document.querySelector('img')?.getAttribute('src') || '',
                        link: item.querySelector('link')?.textContent.trim(),
                        publicationDate: formattedDate, // Ngày đã được định dạng
                    };
                });
            } catch (error) {
                console.error('There was a problem fetching the RSS feed:', error);
                return [];
            }
        }
    }
    
    
    // [GET] /post-edit/:id/edit
    edit(req,res,next) {
        Posts.findById(req.params.id) 
            .then(post => res.render('Admin/post-edit', {
                post: mongoose.singleMongooseToObject(post)
            }))
            .catch(next)    
    }

    // [PUT] /post-edit/:id/
    update(req, res, next) {
        Posts.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/assets'))
            .catch(next)
    }

    // [DELETE] /post-edit/:id/
    delete(req, res, next) {
        Posts.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    topic(req, res, next) {
        Posts.find({topic: id})
    }
}

module.exports = new PostController();
