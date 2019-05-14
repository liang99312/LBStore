/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import com.alibaba.fastjson.JSON;
import com.lb.lbstore.domain.Page;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lb.lbstore.domain.BaoBiao;
import com.lb.lbstore.service.BaoBiaoService;
import com.lb.lbstore.util.FileUtil;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/baoBiao")
public class BaoBiaoController extends BaseController {

    @Resource
    private BaoBiaoService baoBiaoServiceImpl;

    @RequestMapping("goBaoBiao.do")
    public String goBaoBiao() {
        if (!existsUser()) {
            return "../index";
        }
        return "baoBiao/baoBiao";
    }

    @RequestMapping(value = "getBaoBiaosByMk.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getBaoBiaosByMk(@RequestBody BaoBiao model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<BaoBiao> baoBiaoList = new ArrayList<BaoBiao>();
            baoBiaoList = baoBiaoServiceImpl.getBaoBiaosByMk(getDlA01().getQy_id(),model.getMkdm());
            map.put("result", 0);
            map.put("sz", baoBiaoList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getAllBaoBiaos.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllBaoBiaos() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<BaoBiao> baoBiaoList = new ArrayList<BaoBiao>();
            baoBiaoList = baoBiaoServiceImpl.getAllBaoBiaos(getDlA01().getQy_id());
            map.put("result", 0);
            map.put("sz", baoBiaoList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveBaoBiao.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveBaoBiao(@RequestParam("file") MultipartFile file, @RequestParam("model") String modelString) {
        if (!existsUser()) {
            return notLoginResult();
        }
        BaoBiao model = JSON.parseObject(modelString, BaoBiao.class);
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            long now = System.currentTimeMillis();
            String fileName = String.valueOf(now) + suffix;
            String filePath = request.getSession().getServletContext().getRealPath("/") + "/files";
            FileUtil.createFloder(filePath);
            filePath = filePath + "/" + fileName;
            FileUtil.saveFile(file, filePath);
            model.setF_path(filePath);

            model.setQy_id(getDlA01().getQy_id());
            BaoBiao baoBiao = baoBiaoServiceImpl.saveBaoBiao(model);
            map.put("result", 0);
            map.put("baoBiao", baoBiao);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateBaoBiao.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateBaoBiao(@RequestParam("file") MultipartFile file, @RequestParam("model") String modelString) {
        if (!existsUser()) {
            return notLoginResult();
        }
        BaoBiao model = JSON.parseObject(modelString, BaoBiao.class);
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String old_path = model.getF_path();
            String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            long now = System.currentTimeMillis();
            String fileName = String.valueOf(now) + suffix;
            String filePath = request.getSession().getServletContext().getRealPath("/") + "/files";
            FileUtil.createFloder(filePath);
            filePath = filePath + "/" + fileName;
            FileUtil.saveFile(file, filePath);
            model.setF_path(filePath);

            boolean result = baoBiaoServiceImpl.updateBaoBiao(model);
            if (result) {
                File old_file = new File(old_path);
                if (old_file.exists() && old_file.isFile()) {
                    old_file.delete();
                }
            }
            map.put("result", result ? 0 : -1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "deleteBaoBiao.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteBaoBiao(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = baoBiaoServiceImpl.deleteBaoBiao(id);
            map.put("result", result ? 0 : -1);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "getBaoBiaoById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getBaoBiaoById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            BaoBiao baoBiao = baoBiaoServiceImpl.getBaoBiaoById(id);
            map.put("result", 0);
            map.put("baoBiao", baoBiao);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "getBaoBiaoNrById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public void getBaoBiaoNrById(@RequestParam Integer id) {
        if (!existsUser()) {
            return;
        }
        FileReader fileReader = null;
        BufferedReader br = null;
        try {
            this.response.setCharacterEncoding("utf-8");
            this.response.setContentType("text/html; charset=utf-8");
            BaoBiao baoBiao = baoBiaoServiceImpl.getBaoBiaoById(id);
            File file = new File(baoBiao.getF_path());
            if ((file.exists()) && (file.isFile())) {
                FileInputStream in = new FileInputStream(file);
                br = new BufferedReader(new InputStreamReader(in, "UTF-8"));
                char[] buf = new char[4096];
                int len = 0;
                PrintWriter pw = this.response.getWriter();
                while ((len = br.read(buf, 0, 4096)) != -1) {
                    pw.write(buf, 0, len);
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
                if (fileReader != null) {
                    fileReader.close();
                }
            } catch (Exception ex) {
            }
        }
    }

//分页查询
    @RequestMapping(value = "listBaoBiaosByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.baoBiaoServiceImpl.queryRows(map));//查询记录数
        }
        if (model.getRows() == 0) {
            model.setCurrentPage(1);
            model.setList(new ArrayList());
            model.setParamters(new HashMap());
            model.setRows(0);
            model.setTotalPage(0);
            return model;
        }
        if (model.getTotalPage() == 0) {
            model.setTotalPage(model.calcTotalPage());
        }
        map.put("beginRow", model.getBegin());
        map.put("pageSize", model.getPageSize());
        model.setList(this.baoBiaoServiceImpl.queryBaoBiaosByPage(map));
        return model;
    }

}
